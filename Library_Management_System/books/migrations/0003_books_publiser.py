# Generated by Django 3.2.9 on 2021-11-10 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0002_alter_books_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='books',
            name='publiser',
            field=models.CharField(default='N/A', max_length=225),
        ),
    ]
