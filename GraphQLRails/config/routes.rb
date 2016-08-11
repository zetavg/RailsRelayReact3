Rails.application.routes.draw do
  post :graphql, to: 'graph_ql#query'

  resources :posts do
    resources :comments, except: [:index]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
