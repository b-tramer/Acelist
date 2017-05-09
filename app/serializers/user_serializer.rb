class UserSerializer < ActiveModel::Serializer
  attributes :name, :email, :city, :state, :image, :following_count, :followers_count
  has_many :followers

  def followers
    object.followers
  end
end
