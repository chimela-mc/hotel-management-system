from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate, get_user_model
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated,  AllowAny
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.middleware.csrf import get_token
from django.contrib.sessions.models import Session
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.utils import timezone
# Create your views here.

CustomerUser = get_user_model()

@api_view(["GET"])
def endpoint(request):
    data = {
        '/localhost/' : 'List of Endpoint',
        '/logout' : 'Logout User',
        '/dashboard' : 'User Dashboard',
        '/user-profile' : 'User Profile',
        '/api/check-authentication' : 'Check User Authentication',
        '/api/check-sessions' : 'Check Active Sessions',
        '/register' : 'Register User',
        '/api/token' : 'Login User',
        '/api/token/refresh/' : 'Refresh User Token',
        '/rooms/' : 'To create and get new rooms',
        '/rooms/id/' : 'To update, get, and delete a room',
        '/bookings/' : 'To create and get new bookings',
        '/bookings/id/' : 'To update, get, and delete bookings',
        '/services/' : 'To create and get new services',
        '/services/<int:pk>/' : 'To update, get, and delete services',
        '/rooms/id/reviews/' : 'To create and get new reviews',
        '/rooms/id/reviews/id/' : 'To update, get, and delete reviews',
    }

    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_authentication(request):
    return Response({'isAuthenticated': True})

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def check_sessions(request):
    # user = request.user
    sessions = Session.objects.filter(expire_date__gte=timezone.now())
    all_sessions = []

    for session in sessions:
        session_data = session.get_decoded()
        user_id = session_data.get('_auth_user_id')
        if user_id:
            user = CustomerUser.objects.get(id=user_id)
            all_sessions.append({
                'session_key': session.session_key,
                'user_id': user.id,
                "username": user.username,
                "email": user.email,
                "last.login": user.last_login
            })

    return JsonResponse({'active_sessions': all_sessions})

@api_view(["GET"])  # This allows only GET requests
@permission_classes([IsAuthenticated])  # Only authenticated users can access this
def user_profile(request):
    # Data that will be returned as JSON
    user = request.user
    data = {
        'message': 'This is a protected endpoint, only accessible to authenticated users.',
        'status': 'success',
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
    }
    return Response(data)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        # ...

        return token
    
    def validate(self, attrs):
        print('Request body:', attrs)
        print('Email:', attrs.get('email'))
        print('Password:', attrs.get('password'))
        email = attrs.get('email')
        password = attrs.get('password')

        if email is None:
            raise serializers.ValidationError({'email': 'Email is required'})
        if password is None:
            raise serializers.ValidationError({'password': 'Password is required'})

        user = authenticate(email=email, password=password)

        if not user:
            raise serializers.ValidationError('Invalid email or password')

        # Create refresh token for the authenticated user
        refresh = RefreshToken.for_user(user)

        data = {
            'refresh' : str(refresh),
            'access' : str(refresh.access_token),
        }

        return data

class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            tokens = serializer.validated_data  # This contains both refresh and access tokens
            
            # Create a response object and set the access token in an HttpOnly cookie
            response = Response({"message": "Login successful"}, status=status.HTTP_200_OK)
            response.set_cookie(
                key='access_token',
                value=tokens['access'],
                httponly=True,
                secure=True,  # Use secure cookies (only over HTTPS)
                samesite='Lax',  # You can adjust this based on your requirements
            )
            response.set_cookie(
                key='refresh_token',
                value=tokens['refresh'],
                httponly=True,
                secure=True,  # Use secure cookies
                samesite='Lax',
            )
            
            # Remove tokens from the response body
            del tokens['access']
            del tokens['refresh']
            
            return response

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request):
        response = Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response

class HeaderView(generics.RetrieveAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


class DashboardView(generics.ListAPIView):
    queryset = Booking.objects.all()  # Fetch reservations for the user
    serializer_class = BookingSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return reservations only for the authenticated user
        return self.queryset.filter(user=self.request.user)

    def get(self, request, *args, **kwargs):
        is_user_authenticated = request.user.is_authenticated
        print(is_user_authenticated)
        return Response({'isAuthenticated': is_user_authenticated})

class RegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = CustomerUser.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = CustomerUser.objects.get(email=request.data.get('email'))
        refresh = RefreshToken.for_user(user)

        # Set the tokens in HttpOnly cookies
        response.set_cookie(
            key='access_token',
            value=str(refresh.access_token),
            httponly=True,
            secure=True,  # Use HTTPS
            samesite='Lax',
        )
        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            secure=True,
            samesite='Lax',
        )

        return response



class UserProfileUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class ListCreateRoom(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    # permission_classes = [AllowAny]


class GetUpdateDeleteRoom(generics.RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class ListCreateBooking(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class GetUpdateDeleteBooking(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class ListCreateService(generics.ListCreateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class GetUpdateDeleteService(generics.RetrieveUpdateDestroyAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class ListCreateReview(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class GetUpdateDeleteReview(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def get_object(self):
        room_pk = self.kwargs.get('room_pk')
        review_pk = self.kwargs.get('review_pk')
        return Review.objects.get(room_id=room_pk, pk=review_pk)
