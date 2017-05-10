class UserSerializer < ActiveModel::Serializer
  attributes :name, :email, :city, :state, :image, :following_count, :followers_count, :followers, :followings

  def following
    object.followings
  end

end
