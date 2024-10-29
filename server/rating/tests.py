from django.test import TestCase, Client
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Ratings

class RatingAPITestCase(TestCase):
    def setUp(self):
        self.client = Client()
        
        # Create a test user and get their token for authentication
        self.user = User.objects.create_user(username='testuser', password='password')
        self.token = Token.objects.create(user=self.user)
        
        # Authorization header
        self.auth_headers = {
            'HTTP_AUTHORIZATION': f'Token {self.token.key}',
            'Content-Type': 'application/json'
        }
        
        # Sample data for creating a rating
        self.rating_data = {
            "collectorID": 1,
            "rating": 5,
            "comments": "Excellent service",  
            "userID": 123,
            "userName": "Test User",
        }

        # Creating a rating instance for testing retrieval
        self.rating = Ratings.objects.create(**self.rating_data)
        self.rating_id = self.rating.id
        self.collector_id = self.rating.collectorID
        self.user_id = self.rating.userID

    def test_create_rating(self):
        """Test creating a rating with valid data."""
        response = self.client.post('/api/ratings/rating/', self.rating_data, **self.auth_headers)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['rating']['rating'], self.rating_data['rating'])
        self.assertEqual(response.data['rating']['collectorID'], self.rating_data['collectorID'])

    def test_create_rating_invalid_data(self):
        """Test creating a rating with missing required fields."""
        invalid_data = {
            "rating": 4  # Missing required fields like 'collectorID' and 'userID'
        }
        response = self.client.post('/api/ratings/rating/', invalid_data, **self.auth_headers)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_ratings_for_collector(self):
        """Test retrieving ratings for a specific collector."""
        response = self.client.get(f'/api/ratings/collector/{self.collector_id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)
        self.assertEqual(response.data[0]['collectorID'], self.collector_id)

    def test_get_all_ratings(self):
        """Test retrieving all ratings."""
        response = self.client.get('/api/ratings/ratings/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)

    def test_get_ratings_by_user(self):
        """Test retrieving ratings by user ID."""
        response = self.client.get(f'/api/ratings/{self.user_id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)
        self.assertEqual(response.data[0]['userID'], self.user_id)
