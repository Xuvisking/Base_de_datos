# Generated by Django 2.1.1 on 2018-10-29 06:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Tabla', '0002_auto_20181029_0613'),
    ]

    operations = [
        migrations.RenameField(
            model_name='persona',
            old_name='Fecha_nacimimento',
            new_name='Fecha_nacimiento',
        ),
    ]
