class Addcolumntoboard < ActiveRecord::Migration
  def change
     change_column :boards, :user_id, :integer
  end
end
