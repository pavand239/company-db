# Generated by Django 3.0.3 on 2020-03-10 09:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0012_auto_20200302_1616'),
    ]

    operations = [
        migrations.AddField(
            model_name='education',
            name='faculty_name',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]