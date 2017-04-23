class CreateMedia < ActiveRecord::Migration
  def change
    create_table :media do |t|
      t.string :title, null: false
      t.integer :data_id, null: false
      t.text :overview
      t.string :poster_path
      t.string :release_date

      t.timestamps
    end
  end
end
