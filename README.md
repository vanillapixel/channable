# Channable Assignment

## Install

```
yarn install
```

## Run

```
yarn run start
```

---

## Features

- Using either one of the filters resets the others. In this case, multifiltering the list (applying more filters at the same time) would cause bad UX.
  The filter criterias can narrow the results to reasonable amounts for the user to browse comfortably.

- DEBOUNCE function to limit search term change rate to improve computing performance (and database calls if remote) instead of the "Submit" search button.

- Selected channels are previewed in the side pane to facilitate their removal and to help the user which the doublecheck of their selection.

---

## Possible further development

- **Favourite channels selection feature**. Clickable star icon to add the channel to the favourites. Favourite channels are displayed first in the list _(ignoring alphabetic sorting)_
- **Loading icon during the typing** in the search term filter (or API call if remote), returning an error if the loading times out or fails
- **Pagination with soft and hard previous/next buttons**. The soft previous/next button selects the very previous/next page. Hard previous/next buttons select the previous/next set of pages (refactor using useReducer)
