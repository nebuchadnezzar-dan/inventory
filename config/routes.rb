# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  resources :products, only: %i[index show edit destroy show new create edit update]
  resources :warehouses, only: %i[index show edit create new update destroy] do
    resources :stocks, only: %i[create update]
  end
  # resources :stocks

  resources :orders do
    resources :order_items, only: %i[create edit update destroy]
  end

  root to: "pages#homepage"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
