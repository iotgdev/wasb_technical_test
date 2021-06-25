# We Are Silver Bullet - Technical Test

A Technical Assessment for Software Technician Interviewees - TASTI.

---

Introduction
---

Awesome! You're a programmer. Finally! We need a few of those. We have a team directory project, TASTI, that isn't working and we need your help to fix it. You'll only need to know basic python and javascript to get started, although we'll be working with a few frameworks that form part of our other projects.

Instructions will appear in bold.

---

Task 1 - run the application
---
Take a look at the project so far: **Fork the github repo. Clone your fork onto your local machine. Familiarise yourself with the code. Create a new git branch (identified by your name) to work on locally.**

Once you've got the code downloaded, you'll need to run it. This application uses [docker](https://www.docker.com/get-started).
**Download the "Docker Desktop" version appropriate for your system.**

Running docker is easy, and the repo already has scripts necessary to load the right applications.
**Move to the deploy/docker/ directory and run `docker-compose up`**

Docker will build the containers according to specifications, and the `up` command will run them for you.

Two apps will launch. An API, written with [django](https://www.djangoproject.com/) and the [django rest framework](https://www.django-rest-framework.org/) on `http://localhost:8000` and a UI, written with [React](https://reactjs.org/) on `http://localhost:3000`


---

Task 2 - Creating Data
---

The database for the API is empty. Worse still, none of the table schemas have been uploaded. To upload the schemas, migrate the databases and add the database fixures, you can use the django management command.

**In a new terminal window, run `docker-compose exec wasb_api manage.py migrate`**

**In a new terminal window, run `docker-compose exec wasb_api manage.py set_team`**

These commands migrate a local database and add the existing team directory to it.

---

Task 3 - Improving the UI
---

The UI (`http://localhost:3000`) is finally showing some data. We havent styled our application yet, but we can see what we need to see.
The root page of the UI lists our team, but, it's not very clear.

**Add a horizontal rule (`<hr>` HTML tag) between the data for each team member. Do not include a line break before the first, or after the last team member.**

Additionally, it's helpful to order the results from the directory, for quick navigation.

**In the UI, order the data by the name of the team members.**

---

Task 4 - Handling Error States
---


Hmm, it appears that something is broken. It's impossible to look more closely at Nathan's profile (`TeamDetailPage`) in the UI. The console suggests there is a problem with the API and the profile can't be rendered.

The good news, is that our React components recorded an error state, which we can share with our users while we try and find the cause of the bug.

**Implement an error state for a users profile page**

---

Task 5 - Visual embellishment
---

The `TeamDetailPage` could do with a bit more information. We have a lot of crude data, but let's get some other metrics added to the directory. 

**Add to the page a "passionate" section. Add a "passion score" defined as the average hobby strength.**

**Add an "Approximate age" section to the page. If the profile's `years_of_experience` is greater than 40, assume they are "old". If greater than 60, assume "ancient". If less than 30, assume "barely out of diapers". Else, assume "probably a responsible adult"**

**Add all other properties from the API response to the page in an "about" section.**

**Fix all of the errors in the console**

---

Task 6 - Fixing the bug
---

Let's revisit that broken user profile. The API responded with an error code. The docker terminal window will show a traceback when you attempt to call the API for that profile.

**Fix the bug**

---

Task 8 - Adding team members
---

Well, you've been working on the project for a while now, it would be good to add yourself to the directory.

**Update the `set_team.py` file, and add yourself to the directory data. Run the `set_team` command again to upload your data to the database.**

---

Task 9 - Improved ordering
---

Now you've proven you can fix bugs, it's time to make some improvements to the API:

**Add sorting of users to the API.**

**Add a `maximum_passion` property to the profile detail endpoint, containing the maximum strength of a hobby.**

**Update the `set_team.py` file so that Alex is a superuser.**

---

Task 10 - fin
---

Great, the changes are finished. All we need to do now is some peer review. 

**Create a pull request with your changes against the main branch. Send the details of your forked repo to silverbullet**
