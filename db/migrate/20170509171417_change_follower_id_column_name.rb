class ChangeFollowerIdColumnName < ActiveRecord::Migration
  def change
    rename_column :followers, :follower_id, :following_id
  end
end
