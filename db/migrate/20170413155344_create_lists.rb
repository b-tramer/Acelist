class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :name, null: false
      t.integer :rank

      t.belongs_to :user, null: false
      t.belongs_to :media, null: false
      t.timestamps
    end
  end
end
