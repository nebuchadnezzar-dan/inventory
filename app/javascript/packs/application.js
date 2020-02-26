import Rails from '@rails/ujs';
import Turbolinks from 'turbolinks';
import * as ActiveStorage from '@rails/activestorage';
import 'bootstrap';
import popper from 'popper.js';
import jquery from 'jquery';
import '../application.scss';
window.Popper = popper;
window.jQuery = jquery;
window.$ = jquery;
Rails.start();
Turbolinks.start();
ActiveStorage.start();
// ReactRailsUJS.detectEvents();// Support component names relative to this directory:
const componentRequireContext = require.context("components", true);
const ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);
