ActungApp::Application.routes.draw do
  devise_for :users

  resources :users
  resources :locations

  root to: 'locations#index'
end
