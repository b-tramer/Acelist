class UsersController < ApplicationController
  def index
    @user = current_user
  end

  def show
    @list = List.find(params[:id])
  end
end
