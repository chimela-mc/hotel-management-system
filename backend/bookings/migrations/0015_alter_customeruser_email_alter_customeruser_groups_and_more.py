# Generated by Django 5.0.6 on 2024-10-12 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('bookings', '0014_remove_customeruser_username_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customeruser',
            name='email',
            field=models.EmailField(blank=True, max_length=254, verbose_name='email address'),
        ),
        migrations.AlterField(
            model_name='customeruser',
            name='groups',
            field=models.ManyToManyField(blank='True', related_name='custom_user_set', to='auth.group'),
        ),
        migrations.AlterField(
            model_name='customeruser',
            name='profile_pic',
            field=models.ImageField(blank='True', upload_to='media/profile_pics/'),
        ),
        migrations.AlterField(
            model_name='customeruser',
            name='user_permissions',
            field=models.ManyToManyField(blank='True', related_name='custom_user_set', to='auth.permission'),
        ),
    ]
