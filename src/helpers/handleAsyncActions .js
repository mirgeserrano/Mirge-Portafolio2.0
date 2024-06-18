export const handleAsyncActions = (builder, asyncThunk, stateKey) => {
    builder
      .addCase(asyncThunk.pending, (state) => {
        state[stateKey].status = 'pending';
        state.invoiceEmision.pending = true;
      })
      .addCase(asyncThunk.fulfilled, (state, action) => {
        state[stateKey].status = 'succeeded';
        state[stateKey].data = action.payload;
        state.invoiceEmision.pending = false;
      })
      .addCase(asyncThunk.rejected, (state, action) => {
        state[stateKey].status = 'failed';
        state[stateKey].error = action.error.message;
        state.invoiceEmision.pending = false;
      });
  };


