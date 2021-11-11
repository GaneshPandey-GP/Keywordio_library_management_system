from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# Create your models here.




class userManager(BaseUserManager):
	def create_user(self, email, username, password=None):
		if not email:
			raise ValueError('Users must have an email address')
		if not username:
			raise ValueError('Users must have a username')

		user = self.model(
			email=self.normalize_email(email),
			username=username,
		)

		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_superuser(self, email, username, password):
		user = self.create_user(
			email=self.normalize_email(email),
			password=password,
			username=username,
		)
		user.is_admin = True
		user.is_staff = True
		user.is_superuser = True
		user.save(using=self._db)
		return user


class User(AbstractBaseUser):
	email 	= models.EmailField(verbose_name="email", max_length=60, unique=True)
	username = models.CharField(max_length=30, unique=True)
	date_joined	= models.DateTimeField(verbose_name='date joined', auto_now_add=True)
	last_login  = models.DateTimeField(verbose_name='last login', auto_now=True)
	is_admin	= models.BooleanField(default=False)
	is_active	= models.BooleanField(default=True)
	is_staff	= models.BooleanField(default=False)
	is_superuser = models.BooleanField(default=False)


	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username']

	objects = userManager()

	def __str__(self):
		return self.email

	# For checking permissions. to keep it simple all admin have ALL permissons
	def has_perm(self, perm, obj=None):
		return self.is_admin

	# Does this user have permission to view this app? (ALWAYS YES FOR SIMPLICITY)
	def has_module_perms(self, app_label):
		return True

category = [
 ('Action & Adventure','Action & Adventure'),
 ('Comic Book or Graphic Novel','Comic Book or Graphic Novel'),
 ('Classics','Classics'),
 ('Detective & Mystery','Detective & Mystery'),
 ('Historical Fiction','Historical Fiction'),
('Fantasy','Fantasy'),
('Horror','Horror'),
('Literary Fiction','Literary Fiction'),
]
class Books(models.Model):
    name = models.CharField(max_length=20)
    category = models.CharField(max_length=225)
    author = models.CharField(max_length=20)
    publiser = models.CharField(max_length=225)
    publised_on  = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.publised_on
