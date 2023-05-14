import time
from locust import HttpUser, between, task


class WebsiteUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def GetMenuCreation(self):
        self.client.get("/api/recipes/1")

    @task
    def GetSpecificRecipe(self):
        self.client.get("/api/recipes/random/params?mealtime[]=breakfast&mealtime[]=lunch&mealtime[]=dinner&amount=2")

    @task
    def GetItemsSavedMenu(self):
        headers = {'content-type': 'application/json', 
                   'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbGFyYXZlbC50aGliYXV0d2l0dGV2cm9uZ2VsLmNvbS9hcGkvbG9naW4iLCJpYXQiOjE2ODQwOTAzMzMsImV4cCI6MTY4NDA5MzkzMywibmJmIjoxNjg0MDkwMzMzLCJqdGkiOiI3R3h6YnlzVzlkcGpYaXNIIiwic3ViIjoiMTkiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.Q-neMClicdlwa-kx5yM2dHL8fl9KpMjSy753NlCElvw'}
        self.client.get("/api/recipes/in-menu/81", headers=headers)

    @task
    def GetMenusFromUser(self):
        headers = {'content-type': 'application/json', 
                   'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbGFyYXZlbC50aGliYXV0d2l0dGV2cm9uZ2VsLmNvbS9hcGkvbG9naW4iLCJpYXQiOjE2ODQwOTAzMzMsImV4cCI6MTY4NDA5MzkzMywibmJmIjoxNjg0MDkwMzMzLCJqdGkiOiI3R3h6YnlzVzlkcGpYaXNIIiwic3ViIjoiMTkiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.Q-neMClicdlwa-kx5yM2dHL8fl9KpMjSy753NlCElvw'}
        self.client.get("/api/menus", headers=headers)
