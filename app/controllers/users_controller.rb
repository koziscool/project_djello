class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    @users = User.all
    respond_to do |format|
      format.json {render json: @users.to_json}
    end
  end

  def show
    @user = User.find(params[:id])
    unless @user == current_user
      redirect_to :back, :alert => "Access denied."
    end
    respond_to do |format|
      format.json {render json: user.to_json}
    end
  end

end
