class StocksController < ApplicationController
  before_action :set_stocks, only: %i[show edit update destroy]

  def index
    @stocks = Stock.all
  end

  def new
    @stock = Stock.new
  end

  def show; end

  def create
    @stock = Stock.new(stock_params)

    if @stock.save
      redirect_to stock_path(@stock)
    else
      render :new
    end
  end

  def edit; end

  def update
    respond_to do |format|
      if @stock.update(stock_params)
        format.html { redirect_to @stock, notice: 'Stock was successfully updated.' }
      else
        format.html { render :edit }
      end
    end     
  end

  def destroy
    @stock.destroy
    respond_to do |format|
      format.html { redirect_to stocks_url, notice: 'Stock was successfully deleted.' }
    end   
  end

  private

  def set_stocks
    @stock = Stock.find(params[:id])
  end

  def stock_params
    params.require(:stock).permit(:count)
  end

end