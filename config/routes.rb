# frozen_string_literal: true

Rails.application.routes.draw do
  resources :products, only: %i[index show edit destroy show new create edit update]
  resources :warehouses, only: %i[index show edit create new update destroy]
  resources :stocks

  resources :orders do
    resources :order_items, only: %i[create edit update destroy]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
