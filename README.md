# Bookmarks React Client

Simple CRA app for CRUD operations on a list of saved bookmarks. Interfaces with the `bookmarks-server` repo on this account for manipulating bookmarks in a PostgreSQL database.

## Updates

**Checkpoint 17**

Added an edit bookmark page, added router and context for controlling shared state of bookmarks and function for updating individual bookmarks in state when edited via the form. Edit Bookmark page/form hits the API using a `PATCH` request.
