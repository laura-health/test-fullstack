from app import mongo
from flask_wtf import Form
from wtforms import StringField, PasswordField, SubmitField, BooleanField
from wtforms.validators import Required, Length, Email, Regexp, EqualTo
from wtforms import ValidationError


class RegistrationForm(Form):
    name = StringField('name', validators=[Required(), Length(4, 64)])
    email= StringField('email', validators=[Required(), Length(1, 64), Email()])
    password= PasswordField('passoword', validators=[Required()])
    submit= SubmitField('Register')

    def validate_email(self, field):
        users= mongo.db.users
        user= users.find_one({'email': field.data})
        if user:
            raise ValidationError('Email alredy registered.')

    def validate_username(self, field):
        users= mongo.db.users
        user= users.find_one({'name': field.data})
        if user:
            raise ValidationError('Name alredy in use.')


class LoginForm(Form):
    email= StringField('email', validators=[Required()])
    password= PasswordField('password', validators=[Required()])
    submit= SubmitField('Log in')
