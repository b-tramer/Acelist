class RemoveListIdOnMediaColumn < ActiveRecord::Migration
  def change
    remove_column :media, :list_id
  end
end
