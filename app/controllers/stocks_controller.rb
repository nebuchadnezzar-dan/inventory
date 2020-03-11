class StocksController < AdminController
  before_action :set_warehouse, only: %i[create]
  before_action :set_stocks, only: %i[edit update destroy]


  def create
    @stock = @warehouse.stocks.new(stock_params)
    respond_to do |format|
      if @stock.save
        format.html { redirect_to warehouse_path(@warehouse), notic: 'Stock was successfully added' }
        format.json { render json: {  product: ProductSerializer.new(@stock.product, warehouse: @warehouse) } }
      end
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

  def set_warehouse
    @warehouse = Warehouse.find(params[:warehouse_id])
  end

  def set_stocks
    @stock = Stock.find(params[:id])
  end

  def stock_params
    params.require(:stock).permit(:count, :product_id, :warehouse_id)
  end

end

