# Generated by Django 5.0.6 on 2024-07-14 22:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookings', '0004_alter_room_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='image',
            field=models.ImageField(null=True, upload_to='room_images/'),
        ),
    ]
