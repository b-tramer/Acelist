class CreateFollowers < ActiveRecord::Migration
  def change
    create_table :followers do |t|
      t.belongs_to :user, null: false
      t.integer :follower_id, null: false

      t.timestamps
    end
  end
end
