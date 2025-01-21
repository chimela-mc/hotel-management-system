from rest_framework import serializers
from .models import *
from django.db import IntegrityError
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password
import logging
from django.contrib.auth import get_user_model

logger = logging.getLogger(__name__)
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True,)

    class Meta:
        model = CustomerUser
        fields = ('email', 'password', 'password2',)
        extra_kwargs = {
            'email': {'required': True},
            'password': {'required': True},
            'password2': {'required': True},
            # 'phone': {'required': False},
        }

    def validate(self, attrs):
        logger.info(f"Validating registration data: {attrs}")
        email = attrs.get('email')
        password = attrs.get('password')
        password2 = attrs.get('password2')
    
     # Check if the email is provided
        if not email:
            raise serializers.ValidationError({"email": "Email is required."})
        
        # Check if the password is provided
        if not password:
            raise serializers.ValidationError({"password": "Password is required."})

        # Check if the passwords match
        if password != password2:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        
    # Check if the email is already registered
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "Email is already in use."})

        try:
            # Validate the password
            validate_password(password)
        except Exception as e:
            # Log the error messages
            logger.error(f"Password validation error: {str(e)}")
            raise serializers.ValidationError({"password": str(e)})
        
        # # Check if the passwords match
        # if attrs['password'] != attrs['password2']:
        #     raise serializers.ValidationError({"password": "Passwords do not match."})
        
        return attrs

    
    def create(self, validated_data):
        # Remove password2 from validated_data
        validated_data.pop('password2', None)
        
        # Create the user using the custom manager's create_user method
        try:
            user = User.objects.create_user(
                email=validated_data['email'],
                password=validated_data['password']
            )
        except IntegrityError as e:
            if 'unique constraint' in str(e).lower():
                raise serializers.ValidationError({'email': 'This email is already registered.'})
            raise serializers.ValidationError({'non_field_errors': ['An unknown error occurred.']})
        except Exception as e:
            logger.error(f"Unexpected error during user creation: {str(e)}")
            raise serializers.ValidationError({'non_field_errors': ['An unexpected error occurred.']})
        
        return user


    
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerUser
        fields = ['email', 'first_name', 'last_name', 'phone']  # Add any other fields you want users to be able to update
        read_only_fields = ['email']  # Prevent users from changing their email
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'phone': {'required': False},
        }

    def validate_first_name(self, value):
        # Add your validation logic here
        if not value:
            raise serializers.ValidationError("First name is required")
        return value

    def validate_last_name(self, value):
        # Add your validation logic here
        if not value:
            raise serializers.ValidationError("Last name is required")
        return value
    
class RoomTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomType
        fields = '__all__'
        extra_kwargs = {
            'name': {'required': True},
        }

class RoomSerializer(serializers.ModelSerializer):
    # image_url = serializers.SerializerMethodField()
    room_type = serializers.ChoiceField(choices=RoomType.ROOM_TYPES)


    class Meta:
        model = Room
        fields = '__all__'
        extra_kwargs = {
            'room_type': {'required': True},
        }

    def update(self, instance, validated_data):
        room_type_name = validated_data.pop('room_type', None)
        if room_type_name:
            room_type, created = RoomType.objects.get_or_create(name=room_type_name)
            instance.room_type = room_type
        return super().update(instance, validated_data)
    
    def create(self, validated_data):
        room_type_name = validated_data.pop('room_type')
        room_type, created = RoomType.objects.get_or_create(name=room_type_name)
        return Room.objects.create(**validated_data, room_type=room_type)
    
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
        extra_kwargs = {
            'check_in': {'required': True},
            'check_out': {'required': True},
            'cost_per_night': {'required': True},
        }

    def create(self, validated_data):
        # Calculate the duration of stay (number of nights)
        duration = (validated_data['check_out'] - validated_data['check_in']).days
        # Calculate the base cost (price per night)
        base_cost = duration * validated_data['cost_per_night']
        # Calculate the base service (price per night)
        # Add the costs of selected services
        base_service_cost_sum = sum(service.cost * duration for service in validated_data.get('services', []))
        # Calculate the total cost
        total_cost = base_cost + base_service_cost_sum
        # Save the booking with the calculated total cost
        validated_data['total_cost'] = total_cost
        return super().create(validated_data)

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'
        extra_kwargs = {
            'name': {'required': True},
            'cost': {'required': True},
        }

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
        extra_kwargs = {
            'rating': {'required': True},
            'comment': {'required': True},
        }
        
