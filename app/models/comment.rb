class Comment < ActiveRecord::Base
  belongs_to :commentable, :polymorphic => true, :inverse_of => :comments
  
  validates :commentable, :presence => true
  validates :comment, :presence => true
end
