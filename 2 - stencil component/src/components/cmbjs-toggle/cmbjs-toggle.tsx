import { Component, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
  tag: 'cmbjs-toggle',
  styleUrl: 'cmbjs-toggle.css',
  shadow: true,
})
export class CmbjsToggleComponent {
  @Prop() onCaption: string;
  @Prop() offCaption: string;

  @Event() toggled: EventEmitter;

  checkBox: HTMLInputElement;

  render() {
    return (
      <div>
        <slot />

        <input
          class="tgl tgl-flip"
          id="toggle-checkbox"
          type="checkbox"
          ref={el => (this.checkBox = el)}
          onClick={() => this.toggled.emit(this.checkBox.checked)}
        />
        <label
          id="tgl-btn"
          class="tgl-btn"
          data-tg-off={this.onCaption ? this.onCaption : 'False'}
          data-tg-on={this.offCaption ? this.offCaption : 'True'}
          htmlFor="toggle-checkbox"
        />
      </div>
    );
  }
}
