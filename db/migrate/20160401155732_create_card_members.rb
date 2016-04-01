class CreateCardMembers < ActiveRecord::Migration
  def change
    create_table :card_members do |t|

      t.timestamps null: false
    end
  end
end
