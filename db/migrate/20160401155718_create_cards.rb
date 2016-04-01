class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.integer :list_id
      t.integer :priority
      t.boolean :completed, null: false
      t.date :completed_date
      t.string :title, null: false
      t.string :description
      t.timestamps null: false
    end
  end
end
