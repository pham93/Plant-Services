import kivy
import requests
import ssl
from functools import wraps
kivy.require('1.0.0')

from kivy.uix.floatlayout import FloatLayout
from kivy.app import App
from kivy.properties import ObjectProperty, StringProperty
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.lang import Builder
from kivy.graphics import Color, Rectangle


class MenuScreen(Screen):
	def __init__(self, **kwargs):
		super(MenuScreen, self).__init__(**kwargs)

	def search(self):
		self.manager.current = 'search'

	def settings(self):
		self.manager.current = 'settings'

	def exit(self):
		App.get_running_app().stop()

class SettingsScreen(Screen):
	def __init__(self, **kwargs):
		super(SettingsScreen, self).__init__(**kwargs)

	def menu(self):
		self.manager.current = 'menu'

class SearchScreen(Screen):
	results = StringProperty()

	def __init__(self, **kwargs):
		super(SearchScreen, self).__init__(**kwargs)
		self.results = 'Results from nodejs server'

	def menu(self):
		self.manager.current = 'menu'

	def search_btn_press(self):
		r = requests.get('http://localhost:8000/api')
		self.results = r.text


class Manager(ScreenManager):
	pass

class PlantsApp(App):
	def build(self):
		return Manager()


if __name__ == '__main__':
	PlantsApp().run()
