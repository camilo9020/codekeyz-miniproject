Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :questions, only: [:index]
      resources :answers, only: [:create]
      resources :form_durations, only: [:index]
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
