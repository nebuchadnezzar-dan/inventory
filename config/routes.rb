# frozen_string_literal: true

Rails.application.routes.draw do
  resources :products, only: %i[index show edit destroy show new create edit update]
  resources :orders, only: %i[index show create new edit destroy update]
  resources :warehouses, only: %i[index show edit create new update destroy]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
