## Componetns

1. TextArea:

```wml
      <Engine-demo.components:TextArea bind:value="value" on:valueChange="callback()"/>
```
```javascript
      this.value = '';
      this.callback = () => {/*do smth*/}
```

2. Input:

```wml
      <Engine-demo.components:Input bind:value="value" on:valueChange="callback()"/>
```
```javascript
      this.value = '';
      this.callback = () => {/*do smth*/}
```

3. Selector:

```wml
     <Engine-demo.components:Selector items="{{items}}" on:valueChange="callback()"/>
```
```javascript
      this.items = [
            {value: '1', text: 'One'},
            {value: '2', text: 'Two'},
            {value: '3', text: 'Free'}
      ];
      this.callback = () => {/*do smth*/}
```

4. RadioGroup

```wml
     <Engine-demo.components:RadioGroup items="{{items}}" on:selectedKeyChanged="callback()"/>
```
```javascript
      this.items = [
            {value: '1'},
            {value: '2'},
            {value: '3'}
      ];
      this.callback = () => {/*do smth*/}
```

5. CheckBox

```wml
     <Engine-demo.components:CheckBox bind:value="value" on:valueChange="callback()" />
```
```javascript
      this.value = true;
      this.callback = () => {/*do smth*/}
```