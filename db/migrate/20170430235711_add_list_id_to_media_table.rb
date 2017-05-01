class AddListIdToMediaTable < ActiveRecord::Migration
  def change
    add_column :media, :list_id, :integer
  end
end
