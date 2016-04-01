class AddColumnToList < ActiveRecord::Migration
  def change
     add_column :lists, :description, :text
     change_column :cards, :description, :text
  end
end
