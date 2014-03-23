ActungApp::Application.routes.draw do
  resources :users
  resources :locations

  root to: 'locations#index'
end
