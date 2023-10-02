<!-- scaffolding-delete-file unless keepExamples -->
<template>
	<div class="modal-card">
		<header class="modal-card-head">
			<slot name="head">
				<div class="modal-card-title">
					<slot name="title" />
				</div>
			</slot>
		</header>

		<div class="modal-card-body">
			<slot />
		</div>

		<footer class="modal-card-foot is-right-aligned">
			<slot name="foot" />
		</footer>
	</div>
</template>

<script>
export default {
	name: 'TdModalCard',
};
</script>

<style lang="scss" scoped>
// WATCH OUT! Every rule imported inside a <style scoped> tag will get prefixed with a hash and duplicated in the final CSS.
// Importing the entire Bulma theme into every scoped Vue component is a sure way to end up with a HUGE CSS.
//
// @import "some-theme/many-rules"; <- Don't do this
//
// Importing constants, mixins, and functions are still fine. They get inlined, but won't otherwise bloat your CSS.
//
// @import "some-theme/only-constants-mixins-functions"; <- This is fine
.is-right-aligned {
	justify-content: flex-end;
}
</style>
