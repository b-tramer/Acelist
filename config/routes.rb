Rails.application.routes.draw do
  match 'auth/:provider/callback', to: 'sessions#create', via: [:get, :post]
  match 'auth/failure', to: redirect('/'), via: [:get, :post]
  match 'signout', to: 'sessions#destroy', as: 'signout', via: [:get, :post]

  root 'home#index'
  resources :media

  resources :users do
    resources :lists
  end

  resources :lists do
    resources :media
  end

  namespace :api do
    namespace :v1 do
      resources :media, :lists
    end
  end

end
