class Api::CatsController < ApplicationController
  # :authenicate_user! is defined by devise_token_auth
  # check if the token is valid
  # if successfull we will have access to current_user
  # current_user is defined by devise_token_auth
  before_action :authenticate_user!

  def index
    render json: User.unliked_cats(current_user.liked_cats)
  end

  def update
    # add id to array
    current_user.liked_cats << params[:id].to_i
    # save to db
    current_user.save
  end
end
