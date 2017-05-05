class CreateMediaListsJoinTable < ActiveRecord::Migration
  def change
    create_table :media_lists do |t|
      t.belongs_to :media, null: false
      t.belongs_to :list, null: false

      t.timestamps
    end
  end
end
