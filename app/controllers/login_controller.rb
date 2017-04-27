class LoginController < ApplicationController
  def index
    if current_user
      @user = current_user.name
    end
  end
end
