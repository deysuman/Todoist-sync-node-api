# Todoist Sync Node API
[![Build Status](https://travis-ci.org/alexdunne/todoist-sync-node-api.svg?branch=master)](https://travis-ci.org/alexdunne/todoist-sync-node-api)
[![Code Climate](https://codeclimate.com/github/alexdunne/todoist-sync-node-api/badges/gpa.svg)](https://codeclimate.com/github/alexdunne/todoist-sync-node-api)

A wrapper around the [Todoist Sync API](https://developer.todoist.com/?shell#api-overview) written in Javascript.

When a method on a resource is called (e.g. projects, items) a command is created and added to a queue. To send these commands to the Todist Sync API the commit method must be called.

Each method called on a resource returns the local temp_id for that command. This allows multiple resources to be created in a single command. This is especially useful when you wish to create resources which depend on each other in a single request.

Currently supported features:
- [x] Projects
- [x] Items
- [x] OAuth

Upcoming features (The todoist user type required):
- [ ] User - Free
- [ ] Sharing - Free
- [ ] Labels - Premium
- [ ] Notes - Premium
- [ ] Filters - Premium
- [ ] Reminders - Premium


# Setup
Instead of installing any dependencies locally we'll use docker instead.

To build the image run `docker build -t todoist .`

Then create the container and create a volume so that changes on the host machine are also updated in docker.
`docker run -td -P --name todoist-container -v <YOUR_PROJECT_PATH_HERE>:/todoist todoist`

Then to run bash inside the container run `docker exec -it todoist-container bash`.

Change directory into the `todoist` folder and run `npm i` to install the node modules.
