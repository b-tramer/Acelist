class ListsController < ApplicationController

  def index
    @user = User.find(params[:user_id])
    @lists = @user.lists
    # id = @user.lists.media_id
    # @media = Media.find(id)
  end

  def show
    binding.pry
    @list = List.find(params[:id])

  end

end
