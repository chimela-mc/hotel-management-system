# bookings/urls.py
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

urlpatterns = [
    path('', endpoint, name='api-overview'),
    path('user-profile/', user_profile, name='user-profile'),
    path('api/check-authentication/', check_authentication, name='check-authentication'),
    path('api/check-sessions/', check_sessions, name='check_sessions'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('rooms/', ListCreateRoom.as_view(), name='room-list-create'),
    path('rooms/<int:pk>/', GetUpdateDeleteRoom.as_view(), name='room-update-delete'),
    path('bookings/', ListCreateBooking.as_view(), name='booking-list-create'),
    path('bookings/<int:pk>/', GetUpdateDeleteBooking.as_view(), name='booking-update-delete'),
    path('services/', ListCreateService.as_view(), name='service-list-create'),
    path('services/<int:pk>/', GetUpdateDeleteService.as_view(), name='service-update-delete'),
    path('rooms/<int:pk>/reviews/', ListCreateReview.as_view(), name='review-list-create'),
    path('rooms/<int:room_pk>/reviews/<int:review_pk>/', GetUpdateDeleteReview.as_view(), name='review-update-delete'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', UserProfileUpdateView.as_view(), name='user-profile'),
]
