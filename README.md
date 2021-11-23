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

- Using either one of the two filters resets the other. In this case, multifiltering the list (applying both the filters at the same time) would cause bad UX.
  Both the criterias can narrow the results to reasonable amounts for the user to browse comfortably.

- DEBOUNCE function to limit search term change rate to improve computing performance (and database calls if remote) instead of the "Submit" search button.

- Selected channels are previewed in the side pane to facilitate their removal and to help the user which the doublecheck of their selection.

---

## Possible further development

- **Favourite channels selection feature**. Clickable star icon to add the channel to the favourites. Favourite channels are displayed first in the list _(ignoring alphabetic sorting)_
- **Loading icon during the typing** in the search term filter (and API call if remote), returning an error if the loading times out or fails
- **Reset button** to remove all selected channels from the selected channels side pane _(confirmation popup to prevent undesired user's missclicks)_
- **Confirmation button** the selected channels to proceed _(bottom side of the "selected channels" pane)_
- **Color scheme easily customizable** via css variables. I chose a dark theme to save my eyes during the development.

Light color scheme - 1
![White color scheme - 1](https://i.imgur.com/PubNB39.png)
Light color scheme - 2
![Light color scheme - 2](https://i.imgur.com/LVcdEqG.png)
