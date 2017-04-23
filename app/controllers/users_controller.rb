class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @list = List.find(params[:id])
  end
end
