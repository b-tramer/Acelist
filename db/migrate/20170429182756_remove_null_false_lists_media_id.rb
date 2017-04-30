class RemoveNullFalseListsMediaId < ActiveRecord::Migration
  def change
    change_column :lists, :media_id, :integer, :null => true
  end
end
