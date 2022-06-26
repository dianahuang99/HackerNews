"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  start();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  $submitForm.show();
  $favStoriesList.hide();
  $ownStoriesList.hide();
  start();
}

$navSubmit.on("click", navSubmitClick);

async function navFavoritesClick(evt) {
  console.debug("navFavoritesClick", evt);
  await checkForRememberedUser();
  hidePageComponents();
  $favStoriesList.show();
  $noFavoritesMsg.show();
  // if (currentUser.favorites.length == 0) {
  //   $noFavoritesMsg.show();
  // }

  putFavStoriesOnPage();
  stayCheckedIfFav();
}

$navFavorites.on("click", navFavoritesClick);

async function navMyStoriesClick(evt) {
  console.debug("navFavoritesClick", evt);
  await checkForRememberedUser();
  hidePageComponents();
  $ownStoriesList.show();
  $noOwnStoriesMsg.show();
  // if (currentUser.favorites.length == 0) {
  //   $noFavoritesMsg.show();
  // }
  putOwnStoriesOnPage();
  favCheck();
  $("li").prepend("<button class='delete-button'>	&#10060;</button>");
  // putFavStoriesOnPage();
  // stayCheckedIfFav();
}

$navMyStories.on("click", navMyStoriesClick);
